import { createInterface } from 'readline';

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
      console.log(`Your command was: ${input[0]}`)
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Exiting REPL...');
    process.exit(0);
  });
}