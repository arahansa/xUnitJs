
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
        console.log(wasRun.wasRun);
        wasRun.run();
        console.log(wasRun.wasRun);
    }
}



new TestCaseTest('testRunning').run();
