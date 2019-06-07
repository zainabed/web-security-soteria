export class Mock {

    public static create(name: string, methods:string[]) {
        let mockObj = {};
        methods.forEach( method => {
            mockObj[method] = jest.fn();
        });

        return mockObj;
    }
}