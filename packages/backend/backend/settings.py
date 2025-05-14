from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

    DATABASE_URL: str
    account_sid: str
    auth_token: str
    twilio_phone_number: str
    SECRET_KEY: str
