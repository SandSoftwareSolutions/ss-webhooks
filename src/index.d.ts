export declare function sign(payload: string, secret: string): Promise<string>;
export declare function verify(payload: string, signature: string, secret: string): Promise<boolean>;
