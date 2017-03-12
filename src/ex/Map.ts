export class Nmap implements IExCommand {
    public Execute(arg: string, vimStyle: IVimStyle, editor: IEditor) {
        if (arg == null || arg.length === 0) {
            showCurrentMap();
            return;
        }

        let args = divideArg(arg);
        if (args.length === 2) {
            vimStyle.CommandFactory.Nmap[args[0]] = args[1];
        }
    }
}

export class Nnoremap implements IExCommand {
    public Execute(arg: string, vimStyle: IVimStyle, editor: IEditor) {
        if (arg == null || arg.length === 0) {
            showCurrentMap();
            return;
        }

        let args = divideArg(arg);
        if (args.length === 2) {
            vimStyle.CommandFactory.Nnoremap[args[0]] = args[1];
        }
    }
}

function divideArg(arg: string): string[] {
    // TODO escape string
    return arg.split(" ");
}
function showCurrentMap() {
    // TODO
}
