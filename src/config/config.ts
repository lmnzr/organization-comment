class Config {
  public jwtSecret = process.env.JWT_SECRET as string;
  public salt = 9;
}

export default new Config();
