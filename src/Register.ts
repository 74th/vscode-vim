import * as Enums from "./VimStyleEnums";
import * as Utils from "./Utils"

export class RegisterItem {
    public Type: Enums.RegisterType;
    public Body: string;
}

export class Register {
    private char: RegisterItem[];
    private roll: RegisterItem[];
    private yank: RegisterItem;
    private unName: RegisterItem;
    constructor() {
        this.char = [];
        this.roll = [];
        this.yank = null;
        this.unName = null;
    }
    public Set(key: Enums.Key, value: RegisterItem) {
        this.char[key] = value;
    }
    public SetYank(value: RegisterItem) {
        this.unName = value;
        this.yank = value;
    }
    public SetRoll(value: RegisterItem) {
        this.unName = value;
        this.roll.unshift(value);
        if (this.roll.length > 10) {
            this.roll.length = 10;
        }
    }
    public Get(key: Enums.Key): RegisterItem {
        switch (key) {
            case Enums.Key.n0:
                return this.yank;
            case Enums.Key.Quotation:
                return this.unName;
        }
        switch (Utils.GetKeyType(key)) {
            case Enums.KeyType.Charactor:
                return this.GetCharactorRegister(key);
            case Enums.KeyType.Number:
                return this.GetRollRegister(key);
        }
        return null;
    }
    public GetUnName(): RegisterItem{
        return this.unName;
    }
    public GetRollFirst(value: RegisterItem) {
        if (this.roll.length > 0) {
            return this.roll[0];
        }
        return null;
    }
    private GetRollRegister(key: Enums.Key) {
        var n = Utils.KeyToNum(key);
        if (this.roll.length > n+1) {
            return this.roll[n];
        }
        return null;
    }
    private GetCharactorRegister(key: Enums.Key) {
        if (this.char[key] == undefined || this.char[key] == null) {
            return null;
        }
        return this.char[key];
    }
}