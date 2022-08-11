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

    run(result){
        result.testStarted();
        this.setUp();
        const method = this[this.name];
        if(!method) {
            // 여기 testFailed 추가됨
            result.testFailed();
        }else{
            method.call(this, result);
        }
        this.tearDown();
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

    run(result){
        for(let test of this.#tests){
            test.run(result);
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
        const result = new TestResult();
        this.wasRun = new WasRun('testMethod');
        this.wasRun.run(result);
        Assert.assertEquals("setUp testMethod tearDown", this.wasRun.log);
    }

    testResult(){
        const result = new TestResult();
        this.wasRun = new WasRun('testMethod');
        this.wasRun.run(result);
        Assert.assertEquals("1 run, 0 failed", result.getSummary());
    }

    testFailedResultFormatting(){
        const result = new TestResult();
        this.wasRun = new WasRun('testBrokenMethod');
        this.wasRun.run(result);
        Assert.assertEquals("1 run, 1 failed", result.getSummary());
    }

    testSuite(){
        const suite = new TestSuite();
        suite.add(new WasRun('testMethod'));
        suite.add(new WasRun('testBrokenMethod'));
        const result = new TestResult();
        suite.run(result);
        Assert.assertEquals("2 run, 1 failed", result.getSummary());
    }

    static suite(){
        const suite = new TestSuite();
        suite.add(new TestCaseTest('testTemplateMethod'));
        suite.add(new TestCaseTest('testResult'));
        suite.add(new TestCaseTest('testFailedResultFormatting'));
        suite.add(new TestCaseTest('testFailedResult'));
        suite.add(new TestCaseTest('testSuite'));
        return suite;
    }
}

const result = new TestResult();
const suite = TestCaseTest.suite();
suite.run(result);
console.log(result.getSummary());

const suite2 = new TestSuite();
suite2.add(new WasRun('testRunning'));
suite2.add(suite)
// 여기서는 composite 를 할 필요가 없음.
const result2 = new TestResult();
suite2.run(result2);
console.log(result2.getSummary());


