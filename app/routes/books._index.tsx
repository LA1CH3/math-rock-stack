import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Link } from '~/components/Link/Link';
import { getCurrentUser } from '~/services/auth/session';

const book = `                                                                                        
                                                                                        
░░              ░░                    ░░                    ░░                    ░░    
                                                                                        
                                                                                        
                              ██████████          ██████████                            
░░      ░░            ░░    ██          ██  ░░  ██          ██    ░░      ░░            
                          ██              ██  ██              ██                        
                        ██      ██  ██      ██      ██  ██      ██                      
                      ████  ██          ██  ██  ██          ██  ████                    
        ░░      ░░  ██░░██                  ██                  ██░░██    ░░      ░░    
                    ██░░██      ██  ██      ██      ██  ██      ██░░██                  
                    ██░░██  ██          ██  ██  ██          ██  ██░░██                  
                    ██░░██                  ██                  ██░░██                  
                    ██░░██                  ██                  ██░░██                  
                    ██░░██  ████████████    ██    ████████████  ██░░██                  
                    ██░░████            ██  ██  ██            ████░░██                  
░░                  ██░░██  ████████████  ██████  ████████████  ██░░██                  
                    ██░░████░░░░░░░░░░░░██  ██  ██░░░░░░░░░░░░████░░██                  
                    ██░░░░░░░░░░░░░░░░░░░░██████░░░░░░░░░░░░░░░░░░░░██                  
                    ██░░░░░░░░██████████░░░░░░░░░░██████████░░░░░░░░██                  
                    ██░░░░████          ██████████          ████░░░░██                  
                      ████                                      ████                    
                                                                                        
                                                                                        
░░                                                                                      
                                                                                        
                                                                                        
                                                                                        
`;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const currentUser = await getCurrentUser(context, request);

  return json({
    currentUser,
  });
};

export default function BooksIndex() {
  const { currentUser } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center">
      <pre className="ascii-hero">{book}</pre>
      {currentUser ? (
        <Link to="/books/new" button>
          Add a new book
        </Link>
      ) : (
        <p>Select a book on the left to learn more.</p>
      )}
    </div>
  );
}
