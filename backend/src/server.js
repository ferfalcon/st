import Fastify from 'fastify';
import cors from '@fastify/cors';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

async function buildServer() {
  const fastify = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'SYS:standard',
                colorize: true,
              },
            }
          : undefined,
    },
  });

  const corsOrigins =
    typeof process.env.CORS_ORIGIN === 'string'
      ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
      : true;

  await fastify.register(cors, {
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  fastify.get('/api/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }));

  fastify.get('/api/greetings', async (request) => {
    const rawName = request.query?.name;
    const safeName =
      typeof rawName === 'string' && rawName.trim().length > 0
        ? rawName.trim()
        : 'Angular Developer';

    return {
      message: `Welcome to the Fastify backend, ${safeName}!`,
    };
  });

  return fastify;
}

try {
  const server = await buildServer();
  await server.listen({ port: PORT, host: HOST });
  server.log.info(`Server listening on http://${HOST}:${PORT}`);
} catch (err) {
  console.error('Failed to start Fastify server', err);
  process.exit(1);
}
