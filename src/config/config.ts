class Config {
  public jwtSecret = process.env.JWT_SECRET as string;
  public salt = process.env.PASSWORD_SALT as string;
}

export default new Config();
