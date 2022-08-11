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

    run(){
        const method = this[this.name];
        if(!method) throw new Error('method not found');
        method.call(this); // this 바인딩을 사용하기 위함
    }
}

class WasRun extends TestCase{
    constructor(name){
        super(name);
        this.wasRun = false;
    }

    testMethod(){
        this.wasRun = true;
    }
}

class TestCaseTest extends TestCase{
    constructor(name){
        super(name);
    }

    testRunning(){
        const wasRun = new WasRun('testMethod');
        Assert.assertEquals(false, wasRun.wasRun);
        wasRun.run();
        Assert.assertEquals(true, wasRun.wasRun);
    }
}


new TestCaseTest('testRunning').run();


