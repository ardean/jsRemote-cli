const gulp = require("gulp");
const inject = require("gulp-inject");

gulp.task("build-client-html", () => buildClientHtml("prod", "dist/client"));
gulp.task("build-client-html-dev", () => buildClientHtml("dev", "client"));

function buildClientHtml(env, output) {
  return gulp
    .src("index.html")
    .pipe(
      inject(gulp.src([`./client/partials/require-${env}.html`]), {
        relative: true,
        removeTags: true,
        transform: (filePath, file) => file.contents.toString("utf8")
      })
    )
    .pipe(gulp.dest(output));
}
