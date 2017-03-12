import { Nmap, Nnoremap } from "../ex/Map";

export function ExecExCommand(line: string, vimStyle: IVimStyle, editor: IEditor) {
    let sp = line.indexOf(" ");
    let commandName: string;
    let commandArg: string;
    if (sp >= 0) {
        commandName = line.substring(0, sp);
        commandArg = line.substring(sp + 1);
    } else {
        commandName = line;
        commandArg = null;
    }
    let command = selectCommand(commandName);
    if (command !== null) {
        command.Execute(commandArg, vimStyle, editor);
    }
}

function selectCommand(command: string): IExCommand {
    switch (command) {
        case "nmap":
            return new Nmap();
        case "nnoremap":
            return new Nnoremap();
    }
    return null;
}
