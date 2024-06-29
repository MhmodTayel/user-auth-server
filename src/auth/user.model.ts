import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: {
    transform: function (_doc, obj: UserDoc) {
      obj.id = obj._id;
      delete obj.password;
      delete obj.__v;
      delete obj._id;
      return obj;
    },
  },
})
export class User {
  @Prop({
    type: String,
  })
  name: string;
  @Prop({
    type: String,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
  })
  password: string;

  // to make the method visible on the class
  declare validatePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 3);
  this.password = hashedPassword;
  next();
});

UserSchema.method('validatePassword', async function (password: string) {
  return bcrypt.compare(password, this.password);
});

// helper types
export type UserDoc = HydratedDocument<User>;
export type UserModel = Model<User>;
