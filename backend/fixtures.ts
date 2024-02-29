import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Thread from './models/Thread';
import Comment from './models/Comment';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    const collections = ['comments', 'threads', 'users'];

    for (const collectionName of collections) {
      await dropCollection(db, collectionName);
    }

    await User.create([
      {
        username: 'user',
        password: '5str0ngPswrd',
        token: crypto.randomUUID(),
      },
      {
        username: 'admin',
        password: '5str0ngPswrd',
        token: crypto.randomUUID(),
      },
    ]);

    const defaultUser = await User.findOne({ username: 'user' });
    const adminUser = await User.findOne({ username: 'admin' });

    await Thread.create([
      {
        userId: defaultUser?._id,
        title: 'Thread without image',
        description:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        image: null,
      },
      {
        userId: defaultUser?._id,
        title: 'Thread without description',
        description: null,
        image: 'fixtures/saturn.jpg',
      },
    ]);

    await Thread.create([
      {
        userId: adminUser?._id,
        title: 'Admin thread without image',
        description:
          'neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi ' +
          'est sit amet facilisis magna etiam tempor orci eu lobortis elementum',
        image: null,
      },
      {
        userId: adminUser?._id,
        title: 'Admin thread without description',
        description: null,
        image: 'fixtures/io.jpg',
      },
    ]);

    const userThreadWithoutImage = await Thread.findOne({
      title: 'Thread without image',
    });
    const userThreadWithoutDescription = await Thread.findOne({
      title: 'Thread without description',
    });
    const adminThreadWithoutImage = await Thread.findOne({
      title: 'Admin thread without image',
    });
    const adminThreadWithoutDescription = await Thread.findOne({
      title: 'Admin thread without description',
    });

    await Comment.create([
      {
        userId: defaultUser?._id,
        threadId: userThreadWithoutImage?._id,
        content:
          'vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas',
      },
      {
        userId: defaultUser?._id,
        threadId: userThreadWithoutDescription?._id,
        content:
          'mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin',
      },
      {
        userId: defaultUser?._id,
        threadId: adminThreadWithoutImage?._id,
        content:
          'pharetra massa massa ultricies mi quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur',
      },
      {
        userId: defaultUser?._id,
        threadId: adminThreadWithoutDescription?._id,
        content:
          'quis hendrerit dolor magna eget est lorem ipsum dolor sit amet consectetur adipiscing elit ' +
          'pellentesque habitant morbi tristique senectus ' +
          'et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique',
      },
    ]);

    await Comment.create([
      {
        userId: adminUser?._id,
        threadId: userThreadWithoutImage?._id,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
          'labore et dolore magna aliqua. Dignissim suspendisse in est ante in.',
      },
      {
        userId: adminUser?._id,
        threadId: userThreadWithoutDescription?._id,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
          'Proin libero nunc consequat interdum varius sit amet. Eget dolor morbi non arcu. ' +
          'Nec feugiat in fermentum posuere urna nec tincidunt praesent semper.',
      },
      {
        userId: adminUser?._id,
        threadId: adminThreadWithoutImage?._id,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        userId: adminUser?._id,
        threadId: adminThreadWithoutDescription?._id,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
          'Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Suspendisse ultrices gravida dictum fusce.',
      },
    ]);

    await db.close();
  } catch (e) {
    console.log('Collection were missing, skipping drop');
  }
};

void run();
