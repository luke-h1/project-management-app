'use client';

import { login, register } from '@frontend/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Button from './Button';
import Card from './Card';
import Input from './Input';

interface Content {
  linkUrl: string;
  linkText: string;
  header: string;
  subheader: string;
  buttonText: string;
}

const registerContent: Content = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new account',
  subheader: 'Sign up to get started',
  buttonText: 'Sign Up',
};

const loginContent: Content = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

interface Props {
  mode: 'register' | 'login';
}

const AuthForm = ({ mode }: Props) => {
  const [formState, setFormState] = useState({ ...initialState });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'register') {
      await register(formState);
    } else {
      await login(formState);
    }

    setFormState(initialState);
    router.replace('/home');
  };

  const content = mode === 'register' ? registerContent : loginContent;
  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === 'register' && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={e =>
                    setFormState(s => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={e =>
                    setFormState(s => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={e =>
                setFormState(s => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={e =>
                setFormState(s => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
export default AuthForm;
