import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class CharacterMotion extends AbstractMotion implements IRequireCharacterMotion {

    public CharacterCode: number;
    public Direction: Direction;
    public IsTill: boolean;
    public IsContainTargetChar: boolean;

    constructor(direction: Direction) {
        super();
        this.Direction = direction;
        this.IsTill = false;
        this.IsContainTargetChar = false;
    }

    public SetChar(c: string) {
        this.CharacterCode = c.charCodeAt(0);
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        let line = editor.ReadLineAtCurrentPosition();
        let end = new Position();
        end.Line = start.Line;
        let i;
        let count = this.Count;
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