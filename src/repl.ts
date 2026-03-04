import { createInterface } from 'readline';
import { getCommands } from './command_registry.js';

export function cleanInput(input: string): string[] {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return [];
  }

  return trimmedInput.split(/\s+/).map((word) => word.toLowerCase());
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

  rl.prompt();

  rl.on('line', (line) => {
    const input = cleanInput(line);
    if (input.length === 0) {
      rl.prompt();
    } else { 
      const command = input[0];
      const commands = getCommands();
      if (command in commands) {
        commands[command].callback(commands);
      } else {
        console.log(`Unknown command`);
      }
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Exiting REPL...');
    process.exit(0);
  });
}