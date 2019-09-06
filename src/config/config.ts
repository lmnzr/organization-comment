class Config {
  public jwtSecret = process.env.JWT_SECRET as string;
}

export default new Config();
