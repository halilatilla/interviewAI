'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Joel',
    avatar: 'J',
    title: 'Frontend Developer',
    description: "I've been using this for a while now, and it's amazing!"
  },
  {
    name: 'Antonio',
    avatar: 'A',
    title: 'Backend Developer',
    description: 'I love this app, it has helped me a lot in my career!'
  },
  {
    name: 'Mark',
    avatar: 'M',
    title: 'Fullstack Developer',
    description:
      'I was skeptical at first, but after using it for a while, I can say that it is the best in class!'
  },
  {
    name: 'Mary',
    avatar: 'M',
    title: 'DevOps Engineer',
    description: 'I love this app, it has helped me a lot in my career!'
  }
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map(item => (
          <Card key={item.description}>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
