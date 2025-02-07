import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: {
    transform: function (_doc, obj: UserDocument) {
      delete obj.password;
      delete obj.__v;
      return obj;
    },
  },
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  declare validatePassword: (password: string) => Promise<boolean>;

}
export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });


UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 8);
  this.password = hashedPassword;
  next();
})

UserSchema.method('validatePassword', async function (password: string) {
  return bcrypt.compare(password, this.password);
});