import {AbstractMotion} from "./AbstractMotion";
import {Position} from "../VimStyle";

export class FindCharacterMotion extends AbstractMotion {

    private targetCharCode: number;
    private direction: Direction;
    private isTill: boolean;
    private isContainTargetChar: boolean;

    constructor(direction: Direction) {
        super();
        this.direction = direction;
        this.isTill = false;
        this.isContainTargetChar = false;
    }

    public SetChar(c: string) {
        this.targetCharCode = c.charCodeAt(0);
    }

    public SetTillOption() {
        this.isTill = true;
    }

    public SetContainTargetCharOption() {
        this.isContainTargetChar = true;
    }

    public CalculateEnd(editor: IEditor, start: IPosition): IPosition {
        var line = editor.ReadLineAtCurrentPosition();
        var end = new Position();
        end.Line = start.Line;
        var i;
        var count = this.GetCount();
        if (this.direction == Direction.Right) {
            for (i = start.Char + 1; i < line.length; i++) {
                if (this.targetCharCode == line.charCodeAt(i)) {
                    count--;
                    if (count == 0) {
                        end.Char = i;
                        break;
                    }
                }
            }
        } else {
            for (i = start.Char - 1; i >= 0; i--) {
                if (this.targetCharCode == line.charCodeAt(i)) {
                    count--;
                    if (count == 0) {
                        end.Char = i;
                        break;
                    }
                }
            }
        }
        if (count > 0) {
            return null;
        }
        if (this.isTill) {
            if (this.direction == Direction.Right) {
                end.Char -= 1;
            } else {
                end.Char += 1;
            }
        }
        if (this.isContainTargetChar) {
            // use dfx dtx
            end.Char += 1;
        }
        return end;
    }
}