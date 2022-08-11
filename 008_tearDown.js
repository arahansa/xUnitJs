class Assert {
    static assertEquals(expected, actual){
        if(expected !== actual){
            throw new Error(`expected ${expected}, but was ${actual}`);
        }
    }
}

class TestResult{
    getSummary(){
        return `1 run, 0 failed`;
    }
}

class TestCase{
    constructor(name){
        this.name = name;
    }

    setUp(){
    }

    run(){
        this.setUp(); // 요기 setUp 추가됨
        const method = this[this.name];
        if(!method) throw new Error('method not found');
        method.call(this);

        this.tearDown();

        return new TestResult();
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
}


new TestCaseTest('testTemplateMethod').run();
new TestCaseTest('testResult').run();
