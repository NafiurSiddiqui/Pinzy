function gitIt {
   if ($args.Count -eq 0) {
      $message = Read-Host "Enter a commit message"
   } else {
      $message = $args[0]
   }
   git status
   git add -A
   git commit -m "$message"
   git push
}

gitIt $args[0]