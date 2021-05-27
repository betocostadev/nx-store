import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/nxsdb';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // how long to stay signed in = Seconds, minutes, hours, days
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // Add initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // add data seeding here
    },
    lists: createSchema({
      User,
      // schema items
    }),
    ui: {
      // show Keystone UI only for users who pass the logic below
      isAccessAllowed: ({ session }) => !!session?.data,
      // console.log(session);
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: 'id',
    }),
  })
);
