
//   _______                       __                         ______         ________         __        __    __      __
//  /       \                     /  |                       /      \       /        |       /  |      /  |  /  |    /  |
//  $$$$$$$  |  ______   _______  $$ |   __         ______  /$$$$$$  |      $$$$$$$$/______  $$ |____  $$/  _$$ |_   $$ |____    ______
//  $$ |__$$ | /      \ /       \ $$ |  /  |       /      \ $$ |_ $$/          $$ | /      \ $$      \ /  |/ $$   |  $$      \  /      \
//  $$    $$<  $$$$$$  |$$$$$$$  |$$ |_/$$/       /$$$$$$  |$$   |             $$ | $$$$$$  |$$$$$$$  |$$ |$$$$$$/   $$$$$$$  | $$$$$$  |
//  $$$$$$$  | /    $$ |$$ |  $$ |$$   $$<        $$ |  $$ |$$$$/              $$ | /    $$ |$$ |  $$ |$$ |  $$ | __ $$ |  $$ | /    $$ |
//  $$ |__$$ |/$$$$$$$ |$$ |  $$ |$$$$$$  \       $$ \__$$ |$$ |               $$ |/$$$$$$$ |$$ |__$$ |$$ |  $$ |/  |$$ |  $$ |/$$$$$$$ |
//  $$    $$/ $$    $$ |$$ |  $$ |$$ | $$  |      $$    $$/ $$ |               $$ |$$    $$ |$$    $$/ $$ |  $$  $$/ $$ |  $$ |$$    $$ |
//  $$$$$$$/   $$$$$$$/ $$/   $$/ $$/   $$/        $$$$$$/  $$/                $$/  $$$$$$$/ $$$$$$$/  $$/    $$$$/  $$/   $$/  $$$$$$$/
//
//
//
// techtonica instructions:
// * A `name` property.
// * A `balance` property set to 0.
// * A `deposit` method adding the (positive or negative) value passed as an argument to the account balance.
// * A `describe` method returning the account description.
// * A `transfer` method with two parameters: the name of the account that will receive the transfer, and the amount of money to transfer.





class Account {
    constructor(name, balance) {
        this.name = name;
        this.isOpen = true;


        this.balance = balance;
        this.creditLine = 0;

        // debt represents how much of the credit line the account is using/ owes
        this.debt = 0;

        // welcome message
        this.message =(`Welcome to the Bank of Tabitha, ${this.name}!\n`);
        this.display = `Accountholder: ${this.name} Balance: ${this.balance} Credit Line: ${this.creditLine}`

        bankOfTabitha.accounts[this.name] = this;
        bankOfTabitha.openAccounts += 1;
        // we also want to be able to close accounts
        this.closeAccount = function () {
            if (!this.isOpen) {
                this.message = `Your account is already closed.`;
                return false;
            }
            if (this.debt) {
                this.message = `Account closure failed. Please pay your credit card debt of ${this.debt} before closing your account.\n`;
                return false;
            }
            this.message = `Sorry to see you go, ${this.name}.\n`;

            if (this.balance > 0) {
                this.message = `First, let's withdraw your balance of ${this.balance}.\n`;
                this.withdraw(this.balance);
            }
            this.message = `Farewell from Bank of Tabitha.\n`;
            bankOfTabitha.openAccounts -= 1;
            this.isOpen = false;
        };
        // this.creditLine is the max allowed to use as credit. Then we can have a method for starting credit line,
        // credit can max out, card declined. Right now my object has no sense of time/ doesn't retain information
        // in a database, so interest is not possible, but it would be in the future.
        // we should also be able to increase a creditline.
        // open a line of credit if you don't have one already
        this.openCredit = function (amount) {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            if (!this.creditLine) {
                this.creditLine += amount;
                this.message = `Congrats ${this.name}! You have a credit line of ${this.creditLine}.\n`;
                return true;
            }
            this.message = `Hello, ${this.name}. Your account already has a credit line of ${this.creditLine}.\n`;
            return false;
        };

        // using a credit card
        this.useCredit = function (amount) {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            if (this.debt + amount <= this.creditLine) {
                this.debt += amount;
                this.message = `Purchase approved. You are using ${this.debt} of your ${this.creditLine} credit line.\n`;
                return true;
            }
            this.message = `Card declined.\n`;
            return false;
        };

        // pay your credit card bill
        this.payCreditCardBill = function (amount) {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            if (amount <= this.debt) {
                this.debt -= amount;
                this.message = `Thanks for paying your bill, ${this.name}. Your new credit card balance is ${this.debt}.\n`;
                return true;
            }
            this.message = `Payment failed. Your balance is only ${this.debt}. Please pay that amount or less.\n`;
            return false;
        };

        // My preference is to have deposit() and withdrawal() instead of combining them, so I did.
        // Otherwise, transfers are possible even when folks have insufficient funds
        this.deposit = function (amount) {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            if (this._isPositive(amount)) {
                this.balance += amount;
                this.message = `Deposit successful. ${this.name}, your new balance is ${this.balance}.\n`;
                return true;
            }
            return false;
        };

        // not explicitly part of the assignment, but important I believe
        this.withdraw = function (amount) {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            if (this._isAllowed(amount)) {
                this.balance -= amount;
                this.message = `Withdrawal successful. ${this.name}, your new balance is ${this.balance}.\n`;
                return true;
            }
            return false;
        };

        // we need to be sure both the withdrawal and deposit are successful to confirm the transfer
        this.transfer = function (amount, account) {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            if (this.withdraw(amount) && account.deposit(amount)) {
                this.message = `Transfer successful. ${amount} has been transferred from ${this.name} to ${account.name}.\n`;
                return true;
            }
            return false;
        };

        // these methods help me keep illegal actions from taking place. Not 100% neccesary, but perhaps extensible if I create a more complex system
        this._isPositive = function (amount) {
            const isPositive = amount > 0;
            if (!isPositive) {
                this.message = `Amount must be positive! Are you trying to make a withdrawal? Use ${this.name}.withdraw().\n`;
                return false;
            }
            return true;
        };

        // reusing/ expanding these makes sense in the future, for creditLine stuff. adding parameters, etc
        this._isAllowed = function (amount) {
            if (!this._isPositive(amount))
                return false;

            const isAllowed = this.balance - amount >= 0;
            if (!isAllowed) {
                this.message = `${this.name}, you have insufficent funds! Your current balance is ${this.balance}.\n`;
                return false;
            }
            return true;
        };

        // Get some info create the account
        this.describe = function () {
            if (!this.isOpen) {
                this.message = `This account is closed.\n`;
                return false;
            }
            this.message = `${this.name}\'s account:\nBalance: ${this.balance}\nCreditline: ${this.creditLine}\nCredit Card Balance: ${this.debt}\n`;

        };
    }
};

class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = {};
        this.openAccounts = 0;
    }
}

const bankOfTabitha = new Bank("bankOfTabitha");

//testing

const Tabitha = new Account('Tabitha', 1000);
const Tristan = new Account('Tristan', 1000);
const Anatoly = new Account('Anatoly', 1000);
const Georgiana = new Account('Georgiana', 1000);
const Romneya = new Account('Romneya', 1000);
const Arlo = new Account('Arlo', 1000);
// console.log(bankOfTabitha.accounts)
// console.log(bankOfTabitha.openAccounts)



//this is what the html should look like
/* <div class="list_accounts">
      <p id="display_account_msg"><i class="fas fa-comments-dollar"></i> placeholder</p>
      <p id="display_account_name"><i class="fas fa-money-check-alt"></i> placeholder</p>
      <p id=display_account_balance><i class="fas fa-balance-scale-right"></i> placeholder</p>
    </div> */
//DISPLAY ACCOUNTS

// bankOfTabitha.accounts.forEach(function(account) {
//     display = document.querySelector('#display_ul');
//     const li = document.createElement('li');
//     li.className = 'account_name'
//     li.appendChild(document.createTextNode(account.display));
//     display.appendChild(li);

// })

    for (let value in bankOfTabitha.accounts) {
        display = document.querySelector('#display_ul');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(value));
        display.appendChild(li);

    }

let createButton = document.querySelector('#create_button');
createButton.addEventListener('click', function(event) {
    let form = document.querySelector('#new_account_name')
    let accountName = form.value;
    //console.log(accountName)
    const name = new Account(accountName);
    //console.log(name)
    let messageP = document.querySelector('#create_account_msg');
    let msg = document.createElement('span')

    messageP.appendChild(document.createTextNode(name.message));
    event.preventDefault();
    // console.log(name)

  })

// TRANSACTIONS

const transactButton = document.querySelector('#transact_button');
// let formAccount = document.querySelector('#formAccount')
// let formTransact = document.querySelector('#formTransact')
// let formOther = document.querySelector('#formOther')
// let formAmount = document.querySelector('#formAmount')
transactButton.addEventListener('click', function(event) {
    let formAccount = document.querySelector('#formAccount')
    let formTransact = document.querySelector('#formTransact')
    let formOther = document.querySelector('#formOther')
    let formAmount = document.querySelector('#formAmount')
    let accountName = formAccount.value;
    let accountTransact = formTransact.value;
    let accountOther = formOther.value;
    let accountAmount = formAmount.value;
    //console.table(formAccount.value, formTransact.value, formOther.value, formAmount.value)
    //console.log(typeof(formAmount.value))
    let transaction;
    //might have to check values of optional fields against defaults
    if (accountTransact === "balance") {

        let transactMsg = document.querySelector('#transact_account_msg');
        transactMsg.appendChild(document.createTextNode(bankOfTabitha.accounts[accountName].balance));
        return;
    }
    else if (accountTransact === "withdraw") {
        transaction = bankOfTabitha.accounts[accountName].withdraw(accountAmount)
    }
    else if (accountTransact === "deposit") {
        transaction = bankOfTabitha.accounts[accountName].deposit(accountAmount)
    }
    else if (accountTransact === "transfer") {
        let recipient = bankOfTabitha.accounts[accountOther]
        transaction = bankOfTabitha.accounts[accountName].transfer(recipient, accountAmount)
    } else {
        transaction= null;
        console.log(accountName, accountTransact, accountOther, accountAmount)
    }

    let transactMsg = document.querySelector('#transact_account_msg');
    transactMsg.appendChild(document.createTextNode(bankOfTabitha.accounts[accountName].message));
    event.preventDefault();
    //console.log(transaction)


  })
