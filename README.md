# TwelveData UDF API

TwelveData-UDF-API is a simple API that provides data for the [TradingView UDF](https://www.tradingview.com/charting-library-docs/latest/connecting_data/UDF) protocol. It uses the [TwelveData API](https://twelvedata.com/) to fetch the data.

## Getting Started

To get started with TwelveData-UDF-API, you need to have [Node.js](https://nodejs.org/) and pnpm installed on your machine.

1. Clone the repository:
```bash
git clone https://github.com/Propriotec/TwelveData-UDF-API.git
```
2. Navigate into the project directory:
```bash
cd TwelveData-UDF-API
```
3. Install the dependencies:
```bash
pnpm install
```
4. Create a `.env` file in the root of the project and change the following environment variables to your needs:
```env
# Main Settings
APP_NAME="TwelveData UDF API"
NODE_ENV=development
PORT=3000
BEHIND_PROXY=false
DEBUG=false

# Redis Settings
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_USERNAME=""
REDIS_PASSWORD=""
REDIS_DB=0

# Cache Settings
CACHE_TTL_MS=60000
CACHE_USE_REDIS=false

# Throttler Settings
THROTTLER_DEFAULT_TTL_MS=3600000
THROTTLER_DEFAULT_LIMIT=100
THROTTLER_USE_REDIS=false

# JWT Settings
JWT_SECRET="secret"
```
5. Start the server:
```bash
pnpm dev
```
The server will start running at `http://localhost:3000`.
You can view the OpenAPI Via `http://localhost:3000/openapi`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Credits

This template was created by [TheGoatedDev](https://github.com/TheGoatedDev).