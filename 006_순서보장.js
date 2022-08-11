class Assert {
    static assertEquals(expected, actual){
        if(expected !== actual){
            throw new Error(`expected ${expected}, but was ${actual}`);
        }
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
    }
}

class WasRun extends TestCase{
    wasSetup = false;
    wasRun = false;
    log;

    constructor(name){
        super(name);
    }

    setUp() {
        this.wasSetup = true;
        this.log = "setUp";
    }

    testMethod(){
        this.wasRun = true;
        this.log += " testMethod";
    }
}


class TestCaseTest extends TestCase{
    wasRun;

    constructor(name){
        super(name);
    }

    setUp() {
        this.wasRun = new WasRun('testMethod');
    }

    testSetup(){
        Assert.assertEquals(false, this.wasRun.wasSetup);
        this.wasRun.run();
        Assert.assertEquals("setUp testMethod", this.wasRun.log);
        Assert.assertEquals(true, this.wasRun.wasSetup);
    }

    testRunning(){
        Assert.assertEquals(false, this.wasRun.wasRun);
        this.wasRun.run();
        Assert.assertEquals("setUp testMethod", this.wasRun.log);
        Assert.assertEquals(true, this.wasRun.wasRun);
    }
}


new TestCaseTest('testRunning').run();
new TestCaseTest('testSetup').run();
