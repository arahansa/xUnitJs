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
        Assert.assertEquals("setUp testMethod", this.wasRun.log);
    }
}


new TestCaseTest('testTemplateMethod').run();
