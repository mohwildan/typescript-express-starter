class Message {
  public required = (str: string): string => {
    return `Maaf, Data ${str} tidak boleh kosong`;
  };

  public notFound = (str: string): string => {
    return `Maaf, Data ${str} tidak ditemukan`;
  };

  public notValid = (str: string): string => {
    return `Maaf, Data ${str} tidak valid`;
  };

  public existing = (str: string): string => {
    return `Maaf, Data ${str} sudah tersedia`;
  };

  public notExist = (str: string): string => {
    return `Maaf, Data ${str} tidak tersedia`;
  };
}

export default Message;
