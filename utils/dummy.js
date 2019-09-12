const config = require('config');
const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Message } = require('../models/message');
const { Comment } = require('../models/comment');

/**
 * DB Server Configuration
 */
const connectionString = config.get('db.uri') + config.get('db.name');

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.connection.once('open', () => {
  console.log('Inserting dummy data into', connectionString);
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB Error:', err);
});

/**
 * TEST DATA and METHODS
 */
const testUsers = [
  { email: 'test@usera.com', name: 'Test User A', password: '1a2b3c' },
  { email: 'test@userb.com', name: 'Test User B', password: '4d5e6f' },
  { email: 'test@userc.com', name: 'Test User C', password: '7g8h9i' }
];
const testMessages = [
  { message: '1. Whatever you do, do it well. – Walt Disney' },
  { message: '2. Everything you can imagine is real. – Pablo Picasso' },
  { message: '3. Never let your emotions overpower your intelligence. – Drake' },
  { message: '4. I could agree with you but then we’d both be wrong. – Harvey Specter' },
  { message: '5. If you tell the truth you don’t have to remember anything. – Mark Twain' },
  { message: '6. Problems are not stop signs, they are guidelines. – Robert H. Schiuller' },
  { message: '7. All limitations are self-imposed. – Oliver Wendell Holmes' },
  { message: '8. Never regret anything that made you smile. – Mark Twain' },
  { message: '9. Simplicity is the ultimate sophistication. – Leonardo da Vinci' },
  { message: '10. White is not always light and black is not always dark. – Habeeb Akande' }
];
const testComments = [
  { comment: '1. Lorem ipsum is dummy text used in laying out print, graphic or web designs.' },
  { comment: '2. The passage is attributed to an unknown typesetter in the 15th century.' },
  { comment: '3. The purpose of lorem ipsum is to create a natural looking block of text.' },
  { comment: '4. Letraset used it on their dry-transfer sheets during the 90s.' },
  { comment: '5. Read on for the authoritative history of lorem ipsum.' },
  { comment: '6. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.' },
  { comment: '7. The placeholder text, beginning with the line looks like Latin because it was Latin.' },
  { comment: '8. McClintocks eye for detail certainly helped narrow the whereabouts of lorem ipsums origin.' },
  { comment: '9. So how did the classical Latin become so incoherent?' },
  { comment: '10. Its difficult to find examples of lorem ipsum in use before Letraset made it popular.' }
];

const insertDummy = async () => {
  try {}
    await User.collection.drop();
    await Message.collection.drop();
    await Comment.collection.drop();
  } catch (err) {
    console.error('Warning:', err.message);
  }

  const users = await User.insertMany(testUsers);

  const messages = await Message.insertMany([
    { ...testMessages[0], userId: users[0]._id },
    { ...testMessages[1], userId: users[1]._id },
    { ...testMessages[2], userId: users[2]._id },
    { ...testMessages[3], userId: users[0]._id },
    { ...testMessages[4], userId: users[1]._id },
    { ...testMessages[5], userId: users[2]._id },
    { ...testMessages[6], userId: users[0]._id },
    { ...testMessages[7], userId: users[1]._id },
    { ...testMessages[8], userId: users[2]._id },
    { ...testMessages[9], userId: users[0]._id }
  ]);

  const comments = await Comment.insertMany([
    { ...testComments[0], userId: users[2]._id, parentId: messages[1]._id },
    { ...testComments[1], userId: users[1]._id, parentId: messages[1]._id },
    { ...testComments[2], userId: users[0]._id, parentId: messages[2]._id },
    { ...testComments[3], userId: users[2]._id, parentId: messages[3]._id },
    { ...testComments[4], userId: users[1]._id, parentId: messages[3]._id },
    { ...testComments[5], userId: users[0]._id, parentId: messages[3]._id },
    { ...testComments[6], userId: users[2]._id, parentId: messages[7]._id },
    { ...testComments[7], userId: users[1]._id, parentId: messages[8]._id },
    { ...testComments[8], userId: users[0]._id, parentId: messages[8]._id },
    { ...testComments[9], userId: users[2]._id, parentId: messages[9]._id }
  ]);

  await mongoose.disconnect();
  console.log('All done.');
};

insertDummy();
