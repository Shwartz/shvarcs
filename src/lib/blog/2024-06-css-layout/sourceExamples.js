export const ex1 =
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CSS Layout</title>
</head>
<body>

<nav>navigation</nav>
<section>Hero</section>
<section>Cols 8 - 4</section>
<section>Cols 4</section>
<section>Cols 4 - 8</section>
<footer>Footer</footer>

<h1>h1 title</h1>
<h2>h2 title</h2>
<h2>h3 title</h2>
<p>paragraph</p>
<a href="#">link</a>

</body>
</html>`;

export const ex2 =
  `:root {
    /* FONTS */
    /* @link https://utopia.fyi/type/calculator?c=320,18,1.2,1240,20,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */
    --step--2: clamp(0.7813rem, 0.7747rem + 0.0326vi, 0.8rem);
    --step--1: clamp(0.9375rem, 0.9158rem + 0.1087vi, 1rem);
    --step-0: clamp(1.125rem, 1.0815rem + 0.2174vi, 1.25rem);
    --step-1: clamp(1.35rem, 1.2761rem + 0.3696vi, 1.5625rem);
    --step-2: clamp(1.62rem, 1.5041rem + 0.5793vi, 1.9531rem);
    --step-3: clamp(1.944rem, 1.771rem + 0.8651vi, 2.4414rem);
    --step-4: clamp(2.3328rem, 2.0827rem + 1.2504vi, 3.0518rem);
    --step-5: clamp(2.7994rem, 2.4462rem + 1.7658vi, 3.8147rem);
    /* COLORS */
    --colorRaisinBlack: rgb(30, 30, 36);
    --colorPennRed: rgb(146, 20, 12);
    --colorFloralWhite: rgb(255, 248, 240);
    --colorFloralWhite50: rgba(255, 248, 240, 0.5);
    --colorSunset: rgb(255, 207, 153);
    --colorSpaceCadet: rgb(17, 29, 74);
    --colorSpaceCadetLight: rgb(61, 76, 135);
}

body {
    display: flex;
    flex-direction: column;
    background: var(--colorFloralWhite);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

h1 {
    font-size: var(--step-5);
}

h2 {
    font-size: var(--step-4);
}

h3 {
    font-size: var(--step-3);
}

p {
    margin-top: 1rem;
    font-size: var(--step-0);
    line-height: 1.6rem;
}

a {
    color: var(--colorSpaceCadetLight);
    transition: color 0.3s;
}`;

export const ex3 = `<nav>
    <div>
        <a href="./">Logo</a>
        <a href="#/product">Product</a>
        <a href="#/market">Market</a>
        <a href="#/learn">Learn</a>
        <a href="#/getStarted">Get Started</a>
    </div>
</nav>`;

export const ex4 = `:is(nav, section, footer) > div {
    width: 100%;
    max-width: 1200px;
    margin: auto;
}`;

export const ex5 = `/** NAVIGATION */
nav {
    padding: 1rem;
}

nav > div {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: var(--step-1)
}

nav a:last-child {
    margin-left: auto;
}`;

export const ex6 = `/** HERO */
.hero {
    display: flex;
    padding: 2rem;
    color: var(--colorFloralWhite);
    background: linear-gradient(130deg, var(--colorPennRed) 0%, var(--colorRaisinBlack) 50%, var(--colorSpaceCadet) 100%);
}

.hero p {
    max-width: 600px;
    font-size: var(--step-1);
    line-height: 1.9rem;
    font-weight: 200;
}`;

export const ex7 = `<section class="hero">
    <div>
        <h1>Hero title</h1>
        <p>Hero description. Lipsum... </p>
    </div>
</section>`;

export const ex8 = `<footer>
    <div>
        <a href="#">Item 1</a>
        <a href="#">Item 2</a>
        <a href="#">Item 3</a>
        <span>&copy;2024</span>
    </div>
</footer>`;

export const ex9 = `/** FOOTER */
footer {
    margin-top: auto;
    padding: 0 2rem;
    background: var(--colorSpaceCadet);
    color: var(--colorFloralWhite);
}

footer > div {
    display: flex;
    gap: 1rem;
    padding: 2rem 0;
}

footer a {
    color: var(--colorFloralWhite);
    font-size: var(--step-0);
}

footer span {
    margin-left: auto;
}`;

export const ex10 = `body {
    display: flex;
    flex-direction: column;
    /*...*/
}`;

export const ex11 = `html, body {
    height: 100%;
}`;

export const ex12 = `<section class="cols-8-4">
    <div>
        <article>
            <h2>This is cols-8-4</h2>
            <p>.... Loads of text here</p>
        </article>
        <aside>
            <img src="https://picsum.photos/id/16/400/400" alt="Seaside">
        </aside>
    </div>
</section>`;

export const ex13 = `/** COLS-8-4 */
.cols-8-4 {
    padding: 2rem;
}

.cols-8-4 > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 600px) {
    .cols-8-4 > div {
        flex-direction: row;
    }
}

.cols-8-4 article {
    display: flex;
    flex-direction: column;
    flex: 2
}

.cols-8-4 aside {
    display: flex;
    flex-direction: column;
    flex: 1
}

.cols-8-4 aside img {
    border-radius: 0.5rem;
    min-width: 230px;
}`;

export const ex14 = `.cols-8-4 > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}`;

export const ex15 = `@media (min-width: 600px) {
    .cols-8-4 > div {
        flex-direction: row;
    }
}`;

export const ex16 = `@media (min-width: 600px) {
    .cols-8-4 > div {
        flex-direction: row;
    }

    .cols-8-4.reverse > div {
        flex-direction: row-reverse;
    }
}`;

export const ex17 = `<section class="cols-4">
    <div>
        <div>
            <h3>Cool title here</h3>
            <p>... loads of text</p>
        </div>
        <div>
            <img src="https://picsum.photos/id/19/400/400" alt="Tree covered in the moss">
        </div>
        <div>
            <h3>Another title here</h3>
            <p>... loads of text</p>
        </div>
        <div>
            <img src="https://picsum.photos/id/18/400/400" alt="Close shot of the grass with the blurred meadow in a background">
        </div>
    </div>
</section>`;

export const ex18 = `.cols-4 {
    padding: 2rem;
    background: var(--colorSpaceCadet);
    color: var(--colorFloralWhite);
}

.cols-4 > div {
    --min: 28ch;
    --gap: 1rem;
    display: grid;
    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
}  `;

export const ex19 = `.cols-4 p {
    font-size: var(--step--1);
    line-height: 1.4rem;
    font-weight: 100;
    letter-spacing: 1px;
}`;

export const ex20 = `.cols-4 > div > div {
    box-shadow: var(--colorFloralWhite50) 0 0 5px 0;
    border-radius: 0.5rem;
    overflow: hidden;
}`;

export const ex21 = `.cols-4 > div > div:not(:has(img)) {
    padding: 1rem;
}`;

export const ex22 = `.cols-4 img {
    display: block;
    object-fit: cover;
    height: 100%;
    width: 100%
}`;

export const ex23 = `nav a {
    text-decoration: none;
}

a:hover, a:focus {
    color: var(--colorPennRed);
    text-decoration: underline;
}`;

export const ex24 = ``;


