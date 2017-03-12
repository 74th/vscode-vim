import * as Utils from "../Utils";

export class RegisterItem {
    public Type: RegisterType;
    public Body: string;
}

export class Register implements IRegister {
    private char: { [key: string]: IRegisterItem };
    private roll: IRegisterItem[];
    private yank: IRegisterItem;
    private unName: IRegisterItem;
    constructor() {
        this.char = {};
        this.roll = [];
        this.yank = null;
        this.unName = null;
    }
    public Set(key: Key, value: IRegisterItem) {
        this.char[key] = value;
    }
    public SetYank(value: IRegisterItem) {
        this.unName = value;
        this.yank = value;
    }
    public SetRoll(value: IRegisterItem) {
        this.unName = value;
        this.roll.unshift(value);
        if (this.roll.length > 10) {
            this.roll.length = 10;
        }
    }
    public Get(key: Key): IRegisterItem {
        switch (key) {
            case "0":
                return this.yank;
            case "\"":
                return this.unName;
        }
        switch (Utils.GetKeyType(key)) {
            case VimKeyType.Charactor:
                return this.GetCharactorRegister(key);
            case VimKeyType.Number:
                return this.GetRollRegister(key);
        }
        return null;
    }
    public GetUnName(): IRegisterItem {
        return this.unName;
    }
    public GetRollFirst(value: IRegisterItem) {
        if (this.roll.length > 0) {
            return this.roll[0];
        }
        return null;
    }
    private GetRollRegister(key: Key) {
        let n = Utils.KeyToNum(key);
        if (this.roll.length > n + 1) {
            return this.roll[n];
        }
        return null;
    }
    private GetCharactorRegister(key: Key) {
        if (this.char[key] === undefined || this.char[key] == null) {
            return null;
        }
        return this.char[key];
    }
}
