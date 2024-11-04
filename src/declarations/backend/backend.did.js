export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getScript' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'listScripts' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'uploadScript' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
