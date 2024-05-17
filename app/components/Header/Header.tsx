export function Header() {
  return (
    <header className="p-1 flex flex-col sm:flex-row">
      <h1 className="uppercase text-xl sm:mr-auto">Math Rock Stack</h1>
      <nav>
        <ul className="flex flex-col sm:flex-row gap-4">
          <li className="uppercase">
            <a href="/blog">Blog</a>
          </li>
          <li className="uppercase">
            <a href="/books">Books</a>
          </li>
          <li className="uppercase">
            <a href="/music">Music</a>
          </li>
          <li className="uppercase">
            <a href="/video-games">Video games</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
