export const getPermit = async () => {
  if (!window.keplr || !window.getOfflineSignerOnlyAmino) return;
  const keplrOfflineSigner = window.getOfflineSignerOnlyAmino("mantle-1");
  const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
  return await window.keplr.signAmino(
    "mantle-1",
    myAddress,
    {
      chain_id: "mantle-1",
      account_number: "0",
      sequence: "0",
      fee: {
        amount: [{ denom: "uscrt", amount: "0" }],
        gas: "1",
      },
      msgs: [
        {
          type: "login-ibc-discover",
          value:
            "This permit is used to verify ownership of your account so you can claim your rewards on IBC Discover.",
        },
      ],
      memo: "Created with ❤️ by IBC Frens NFT and Team",
    },
    {
      preferNoSetFee: true, // Fee must be 0, so hide it from the user
      preferNoSetMemo: false,
    }
  );
};
