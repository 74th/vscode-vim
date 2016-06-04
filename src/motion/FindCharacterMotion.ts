import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class CharacterMotion extends AbstractMotion implements IRequireCharacterMotion {

    public CharacterCode: number;
    public Direction: Direction;
    public OppositeDirection: boolean;
    public IsTill: boolean;
    public IsContainTargetChar: boolean;

    constructor(direction: Direction) {
        super();
        this.Direction = direction;
        this.OppositeDirection = false;
        this.IsTill = false;
        this.IsContainTargetChar = false;
        this.CharacterCode = null;
    }

    public SetChar(c: string) {
        this.CharacterCode = c.charCodeAt(0);
    }

    public CalculateEnd(editor: IEditor, vim: IVimStyle, start: IPosition): IPosition {
        let line = editor.ReadLineAtCurrentPosition();
        let end = new Position();
        end.Line = start.Line;
        let i;
        let count = this.Count;
        if (this.CharacterCode === null) {

            if (vim.LastFindCharactorCode === null) {
                return null;
            }

            this.CharacterCode = vim.LastFindCharactorCode;

            if (this.OppositeDirection) {
                if (vim.LastFindCharactorDirection === Direction.Left) {
                    this.Direction = Direction.Right;
                } else {
                    this.Direction = Direction.Left;
                }
            } else {
                this.Direction = vim.LastFindCharactorDirection;
            }

        } else {

            // save direction for ; ,
            vim.LastFindCharactorCode = this.CharacterCode;
            vim.LastFindCharactorDirection = this.Direction;

        }
        if (this.CharacterCode === null) {
            return null;
        }

        if (this.Direction === Direction.Right) {
            for (i = start.Char + 1; i < line.length; i++) {
                if (this.CharacterCode === line.charCodeAt(i)) {
                    count--;
                    if (count === 0) {
                        end.Char = i;
                        break;
                    }
                }
            }
        } else {
            for (i = start.Char - 1; i >= 0; i--) {
                if (this.CharacterCode === line.charCodeAt(i)) {
                    count--;
                    if (count === 0) {
                        end.Char = i;
                        break;
                    }
                }
            }
        }
        if (count > 0) {
            return null;
        }
        if (this.IsTill) {
            if (this.Direction === Direction.Right) {
                end.Char -= 1;
            } else {
                end.Char += 1;
            }
        }
        if (this.IsContainTargetChar) {
            // use dfx dtx
            end.Char += 1;
        }
        return end;
    }
}