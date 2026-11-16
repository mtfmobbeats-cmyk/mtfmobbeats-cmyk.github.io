# Brandon Wilkes — Commercial Lending Portfolio

A responsive GitHub Pages portfolio for **commercial loan documentation, credit operations, exception review, and financial information analysis**.

## What's included

- `index.html`: Professional homepage, work, expertise, background, and contact
- `projects/loan-review.html`: Interactive fictional loan file review with exception generation
- `projects/operations-dashboard.html`: Dynamic, filterable dashboard containing **500 synthetic records** and CSV export
- `projects/financial-review.html`: Fictional financial-information reconciliation and a **simplified** coverage-ratio illustration
- `assets/`: Styles, JavaScript, and vector favicon
- `.nojekyll`: Tells GitHub Pages to serve the site as plain static files

**No build system, Node installation, or paid hosting required.** The whole site uses standard HTML, CSS and JavaScript, and runs directly from GitHub Pages.

## Publish this website on GitHub Pages

1. Log in to https://github.com and create a **new public repository**.
2. For a portfolio at your root address, name the repository `mtfmobbeats-cmyk.github.io` (your connected GitHub username). If you use another name, e.g. `commercial-lending-portfolio`, your address will be `https://YOUR-USERNAME.github.io/commercial-lending-portfolio/`.
3. Upload **the contents of this folder** directly to your repository's root. Crucially, GitHub must see `index.html` at the top level, not nested under an additional folder. Use **Add file → Upload files → Commit changes** or `git`.
4. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, and folder **/(root)**. Save.
5. Open `https://mtfmobbeats-cmyk.github.io/` for a username repository, or `https://mtfmobbeats-cmyk.github.io/REPOSITORY/` for another repository name. Publication is not instant.

See [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart) for current official instructions.

## Preview locally

Double-click `index.html` to browse the site on your computer. Alternatively, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in your browser.

## Before publishing

- The website currently shows the professional email address supplied on the resume, `brandonjamalwilkes@gmail.com`. **This will be publicly visible.** Replace `mailto:` links in the `.html` files if you'd rather use a separate professional inbox.
- No phone number, home address, or PDF resume is included. You can upload a carefully reviewed, public-safe resume PDF later and add a link.
- **Do not upload real lender/customer documents or confidential financial information.** All current names and records in the projects are fictional.
- The portfolio omits the CBCA coursework claim present in an earlier resume because it should not be listed unless it is current and accurate.
- Update any personal role descriptions or project conclusions before using them in a job application. The demo projects illustrate skills; do not describe fictional cases as transactions you actually handled.

## Editing tips

- Change the hero introduction, case study links, or work history in `index.html`.
- Change the portfolio's colors in `assets/styles.css` (top of file).
- Change demo logic only if you understand the illustrative assumptions in `assets/*.js`.
- Keep the fictional-data disclaimers prominent.

## Hosting notes

GitHub Pages is **static hosting**. Interactive functionality here runs inside the visitor's browser, with no private server or database. Later, a separately deployed Streamlit app could be linked or embedded, but GitHub Pages alone does not run Python/Streamlit backends.


## Recruiter update (November 2026)

- Public PDF resume: `resume/Brandon_Wilkes_Resume.pdf` (email retained; phone omitted).
- Resume omits an earlier unverified CBCA coursework claim.
- Case studies include step-by-step reasoning and explicit limits of review authority.
- Direct LinkedIn profile URL was not verifiable. The website labels its LinkedIn link as a *search*, not a verified individual profile; replace it with your exact profile URL when available.
- All borrower, company and dashboard examples are fictional.