class WasRun{
    constructor(){
        this.wasRun = false;
    }

    testMethod(){
        this.wasRun = true;
    }
}


const wasRun = new WasRun();
console.log(wasRun.wasRun);
wasRun.testMethod();
console.log(wasRun.wasRun);
