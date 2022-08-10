class WasRun{
    constructor(name){
        this.wasRun = false;
        this.name = name;
    }

    testMethod(){
        this.wasRun = true;
    }

    run(){
        const method = this[this.name];
        if(!method) throw new Error('method not found');
        method.call(this); // this 바인딩을 사용하기 위함
    }
}


const wasRun = new WasRun('testMethod');
console.log(wasRun.wasRun);
wasRun.run();
console.log(wasRun.wasRun);
