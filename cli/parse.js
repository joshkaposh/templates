export default function parsed(args) {
  const options = {
    template: args._[1] ?? 'vanilla',
    mono: args.mono,
  };
  return {
    name: args._[0],
    template: args._[1],
    options
  };
}