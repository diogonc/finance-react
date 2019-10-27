import { getDatesPerMonth, addMonthsToDate, getDateMonthAndYear } from '../utils';

class FutureBalanceReport {

    // {
    //     "currentValue": 280.00
    //     "averageDifference": 200,
    //     "anualIncreaseRate": 5.5,
    //     "monthlyIncreaseRate": 0.65,
    //     "startDate": 2019-09-10,
    //      "futureBalance": {
    //           "08/2019": {
    //              "balance": 280.00,
    //              "difference": 200
    //          },
    //          ...,
    //          "02/2020": {
    //              "balance": 280.00,
    //              "difference": 200
    //          },
    //          "08/2020": {
    //              "balance": 280.00,
    //              "difference": 200
    //          },
    //          "09/2020": {
    //              "balance": 280.00,
    //              "difference": 200
    //          },
    //          ... ,
    //          "08/2025": {
    //              "balance": 280.00,
    //              "difference": 200
    //          },
    //          "08/2030": {
    //              "balance": 280.00,
    //              "difference": 200
    //          },
    //          "08/2035": {
    //              "balance": 280.00,
    //              "difference": 200
    //          }
    //      }
    //      
    // }    
    getReport(currentValue, averageDifference, monthlyIncreaseRate, numberOfYears) {
        try {
            const startDate = new Date();
            const result = {
                currentValue,
                averageDifference,
                monthlyIncreaseRate,
                numberOfYears
            }
            result.futureBalance = {};

            currentValue = this._getFirst12Months(startDate, currentValue, averageDifference, monthlyIncreaseRate, result);

            currentValue = this._getNextYears(startDate, numberOfYears, averageDifference, monthlyIncreaseRate, currentValue, result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    _getNextYears(startDate, numberOfYears, averageDifference, monthlyIncreaseRate, currentValue, result) {
        var currentMonth = addMonthsToDate(startDate, 12);
        for (var year = 2; year <= numberOfYears; year++) {
            const numberOfMonths = 12;
            currentMonth = addMonthsToDate(currentMonth, numberOfMonths);
            const yearBalance = { balance: 0, difference: 0 };
            yearBalance.balance = this.getBalanceFromNumberOfMonths(currentValue, averageDifference, monthlyIncreaseRate, numberOfMonths);
            yearBalance.difference = (yearBalance.balance - currentValue - (averageDifference * numberOfMonths)) / numberOfMonths;
            result.futureBalance[getDateMonthAndYear(currentMonth)] = yearBalance;
            currentValue = yearBalance.balance;
        }
        return currentValue;
    }

    _getFirst12Months(startDate, currentValue, averageDifference, monthlyIncreaseRate, result) {
        const months = getDatesPerMonth(addMonthsToDate(startDate, 1), addMonthsToDate(startDate, 12));
        let previousMonthValue = currentValue;
        months.forEach(month => {
            const monthBalance = { balance: 0, difference: 0 };
            monthBalance.balance = this.getBalanceFromNumberOfMonths(previousMonthValue, averageDifference, monthlyIncreaseRate, 1);
            monthBalance.difference = monthBalance.balance - previousMonthValue - averageDifference;
            result.futureBalance[month] = monthBalance;
            previousMonthValue = monthBalance.balance;
        });
        return previousMonthValue;
    }

    getBalanceFromNumberOfMonths(startValue, averageDifference, monthlyIncreaseRate, numberOfMonths) {
        var total = startValue;
        var monthlyIncreaseDecimal = 1 + monthlyIncreaseRate / 100;
        for (var month = 1; month <= numberOfMonths; month++) {
            total *= monthlyIncreaseDecimal;
            total += averageDifference;
        }
        return total;
    }
}

export default new FutureBalanceReport();
