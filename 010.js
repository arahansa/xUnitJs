class Assert {
    static assertEquals(expected, actual){
        if(expected !== actual){
            throw new Error(`expected ${expected}, but was ${actual}`);
        }
    }
}

class TestResult{
    #runCount = 0;
    #errorCount = 0;

    testStarted(){
        this.#runCount++;
    }

    testFailed(){
        this.#errorCount++;
    }

    getSummary(){
        return `${this.#runCount} run, ${this.#errorCount} failed`;
    }
}

class TestCase{
    constructor(name){
        this.name = name;
    }

    setUp(){
    }

    run(){
        const result = new TestResult();
        result.testStarted();
        this.setUp();
        const method = this[this.name];
        if(!method) {
            // 여기 testFailed 추가됨
            result.testFailed();
        }else{
            method.call(this);
        }
        this.tearDown();

        return result;
    }

    tearDown(){

    }
}

class WasRun extends TestCase{
    log;

    constructor(name){
        super(name);
    }

    setUp() {
        this.log = "setUp";
    }

    testMethod(){
        this.log += " testMethod";
    }

    tearDown() {
        this.log += " tearDown";
    }
}

class TestSuite{
    #tests = [];

    add(test){
        this.#tests.push(test);
    }

    run(){
        let result = new TestResult();
        for(let test of this.#tests){
            test.run(result); // ????
        }
        return result;
    }
}

class TestCaseTest extends TestCase{
    wasRun;

    constructor(name){
        super(name);
    }

    setUp() {

    }

    testTemplateMethod(){
        this.wasRun = new WasRun('testMethod');
        this.wasRun.run();
        Assert.assertEquals("setUp testMethod tearDown", this.wasRun.log);
    }

    testResult(){
        this.wasRun = new WasRun('testMethod');
        const result = this.wasRun.run();
        Assert.assertEquals("1 run, 0 failed", result.getSummary());
    }

    testFailedResultFormatting(){
        this.wasRun = new WasRun('testBrokenMethod');
        const result = this.wasRun.run();
        Assert.assertEquals("1 run, 1 failed", result.getSummary());
    }

    testSuite(){
        const suite = new TestSuite();
        suite.add(new WasRun('testMethod'));
        suite.add(new WasRun('testBrokenMethod'));
        const result = suite.run();
        Assert.assertEquals("2 run, 1 failed", result.getSummary());
    }
}


console.log(new TestCaseTest('testTemplateMethod').run().getSummary());
console.log(new TestCaseTest('testResult').run().getSummary());
console.log(new TestCaseTest('testFailedResultFormatting').run().getSummary());
console.log(new TestCaseTest('testFailedResult').run().getSummary());
console.log(new TestCaseTest('testSuite').run().getSummary());
