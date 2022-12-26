import { CalculatorNumber } from "../src/CalculatorNumber";

describe("Testing CalculatorNumber.asNumber", () => {
    
    test("Zero number should result in zero", () => {
        const num = new CalculatorNumber("0", "", false);
        expect(num.asNumber()).toBe(0);
    });

    test("Positive integer should return likewise", () => {
        const num = new CalculatorNumber("12", "", false);
        expect(num.asNumber()).toBe(12);
    });

    test("Negative integer should return likewise", () => {
        const num = new CalculatorNumber("12", "", true);
        expect(num.asNumber()).toBe(-12);
    });

    test("Large positive integer should return likewise", () => {
        const num = new CalculatorNumber("1231231231456789", "", false);
        expect(num.asNumber()).toBe(1231231231456789);
    });

    test("Large negative integer should return likewise", () => {
        const num = new CalculatorNumber("1231231231456789", "", true);
        expect(num.asNumber()).toBe(-1231231231456789);
    });

    test("Positive float should return likewise", () => {
        const num = new CalculatorNumber("1.234", "", false);
        expect(num.asNumber()).toBe(1.234);
    });

    test("Negative float should return likewise", () => {
        const num = new CalculatorNumber("1.234", "", true);
        expect(num.asNumber()).toBe(-1.234);
    });

    test("Long positive float should return likewise", () => {
        const num = new CalculatorNumber("123456789.123456789", "", false);
        expect(num.asNumber()).toBe(123456789.123456789);
    });

    test("Long negative float should return likewise", () => {
        const num = new CalculatorNumber("123456789.123456789", "", true);
        expect(num.asNumber()).toBe(-123456789.123456789);
    });
    test("Scientific notation positive e+", () => {
        const num = new CalculatorNumber("1.123e+3", "", false);
        expect(num.asNumber()).toBe(1.123e+3);
    });
    test("Scientific notation positive e-", () => {
        const num = new CalculatorNumber("1.123e-3", "", false);
        expect(num.asNumber()).toBe(1.123e-3);
    });
    test("Scientific notation negative e+", () => {
        const num = new CalculatorNumber("1.123e+3", "", true);
        expect(num.asNumber()).toBe(-1.123e+3);
    });
    test("Scientific notation negative e-", () => {
        const num = new CalculatorNumber("1.123e-3", "", true);
        expect(num.asNumber()).toBe(-1.123e-3);
    });
});

describe("Testing CalculatorNumber.asString", () => {
    test("Zero results in zero", () => {
        const num = new CalculatorNumber("0", "", false);
        expect(num.asString()).toBe("0");
    });
    test("Negative zero results in negative zero", () => {
        const num = new CalculatorNumber("0", "", true);
        expect(num.asString()).toBe("-0");
    });
    test("Positive integer", () => {
        const num = new CalculatorNumber("123", "", false);
        expect(num.asString()).toBe("123");
    });
    test("Negative integer", () => {
        const num = new CalculatorNumber("123", "", true);
        expect(num.asString()).toBe("-123");
    });
    test("Large positive integer", () => {
        const num = new CalculatorNumber("123456789123456789", "", false);
        expect(num.asString()).toBe("123456789123456789");
    });
    test("Large negative integer", () => {
        const num = new CalculatorNumber("123456789123456789", "", true);
        expect(num.asString()).toBe("-123456789123456789");
    });
    test("Positive float", () => {
        const num = new CalculatorNumber("123.456", "", false);
        expect(num.asString()).toBe("123.456");
    });
    test("Negative float", () => {
        const num = new CalculatorNumber("123.456", "", true);
        expect(num.asString()).toBe("-123.456");
    });
    test("Large positive float", () => {
        const num = new CalculatorNumber("123456789.123456789", "", false);
        expect(num.asString()).toBe("123456789.123456789");
    });
    test("Large negative float", () => {
        const num = new CalculatorNumber("123456789.123456789", "", true);
        expect(num.asString()).toBe("-123456789.123456789");
    });
    test("Scientific notation positive e+", () => {
        const num = new CalculatorNumber("1.123e+3", "", false);
        expect(num.asString()).toBe("1.123e+3");
    });
    test("Scientific notation positive e-", () => {
        const num = new CalculatorNumber("1.123e-3", "", false);
        expect(num.asString()).toBe("1.123e-3");
    });
    test("Scientific notation negative e+", () => {
        const num = new CalculatorNumber("1.123e+3", "", true);
        expect(num.asString()).toBe("-1.123e+3");
    });
    test("Scientific notation negative e-", () => {
        const num = new CalculatorNumber("1.123e-3", "", true);
        expect(num.asString()).toBe("-1.123e-3");
    });
});

describe("Testing CalculatorNumber.isValid", () => {
    test("Zero is valid", () => {
        const num = new CalculatorNumber("0", "", false);
        expect(num.isValid()).toBe(true);
    });
    test("Negative zero is valid", () => {
        const num = new CalculatorNumber("0", "", true);
        expect(num.isValid()).toBe(true);
    });
    test("Positive integer is valid", () => {
        const num = new CalculatorNumber("123", "", false);
        expect(num.isValid()).toBe(true);
    });
    test("Negative integer is valid", () => {
        const num = new CalculatorNumber("123", "", false);
        expect(num.isValid()).toBe(true);
    });
    test("Positive float is valid", () => {
        const num = new CalculatorNumber("123.123", "", false);
        expect(num.isValid()).toBe(true);
    });
    test("Negative float is valid", () => {
        const num = new CalculatorNumber("123.123", "", true);
        expect(num.isValid()).toBe(true);
    });
    test("Positive scientific e+ is valid", () => {
        const num = new CalculatorNumber("1.12345e+10", "", false);
        expect(num.isValid()).toBe(true);
    });
    test("Positive scientific e- is valid", () => {
        const num = new CalculatorNumber("1.12345e-10", "", false);
        expect(num.isValid()).toBe(true);
    });
    test("Negative scientific e+ is valid", () => {
        const num = new CalculatorNumber("1.12345e+10", "", true);
        expect(num.isValid()).toBe(true);
    });
    test("Negative scientific e- is valid", () => {
        const num = new CalculatorNumber("1.12345e-10", "", true);
        expect(num.isValid()).toBe(true);
    });
});

describe("Testing CalculatorNumber.operator", () => {
    test("Get operator via constructor", () => {
        const num = new CalculatorNumber("1", "+", false);
        expect(num.operator).toBe("+");
    });
    test("Get non-operator via constructor", () => { // TODO: undesirable behavior?
        const num = new CalculatorNumber("1", "?", false);
        expect(num.operator).toBe("?");
    });
    test("Get operator via append", () => {
        const num = new CalculatorNumber("1", "", false);
        expect(num.operator).toBe("");

        num.append("+");

        expect(num.operator).toBe("+");
    });
    test("Non-operator filtered via append", () => {
        const num = new CalculatorNumber("1", "", false);
        expect(num.operator).toBe("");

        num.append("?");

        expect(num.operator).toBe("");
    });
    test("Subtract operator makes blank number negative, then adds operator second time", () => {
        const num = new CalculatorNumber("", "", false);
        expect(num.negative).toBe(false);
        num.append("-");
        expect(num.negative).toBe(true); // becomes negative
        expect(num.operator).toBe("");   // no operator yet
        num.append("-");                 // attempts second append, but blocks it due to invalid num
        expect(num.operator).toBe("");   // no operator yet, we need a valid number
        expect(num.isValid()).toBe(false);
        expect(num.negative).toBe(true);
        num.append("1");
        num.append("-");
        expect(num.operator).toBe("-");  // now with a valid number, '-' operator is appended
    });

});