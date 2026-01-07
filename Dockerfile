FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=development

RUN npm install -g pnpm

# نسخ ملفات workspace
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# نسخ package الخاص بالـ gateway
COPY apps/gateway/package.json apps/gateway/package.json

# تثبيت dependencies الخاصة بالـ gateway
RUN pnpm install --filter ./apps/gateway... --frozen-lockfile

# نسخ كود gateway
COPY apps/gateway ./apps/gateway

WORKDIR /app/apps/gateway

RUN pnpm build

EXPOSE 4000
CMD ["pnpm", "start"]
