#!/bin/bash

# default global_opts

exec_root_dir=$(dirname "$0")/..
paths_to_process="src/*/"
theme=black
format="html5 --template=reveal.js/reveal-template.html"
output_dir="docs/"

# helpers

source $(dirname "$0")/arg_path_mgmt.sh

function build_slides {
	chapter_name=$(basename $1)
	src_path_abs=$(realpath $1)
	output_file_abs="$(realpath "$output_dir")/${chapter_name}/index.html"
	echo "DEBUG: param=$1 chapter_name=$chapter_name src_path_abs=$src_path_abs output_file_abs=$output_file_abs"
	
	mkdir -p $output_dir
	ln -s $(realpath vendor/reveal.js) $src_path_abs/reveal.js
	ln -s $(realpath vendor/reveal.js/css) $src_path_abs/css
	cd $src_path_abs

	cmdline="pandoc -t $format --self-contained --section-divs --slide-level 2 -V theme=$theme --include-in-header=reveal.js/css/text.css -s $src_path_abs/*.md -o $output_file_abs --columns=1000"
	echo "DEBUG: cmdline: $cmdline"
	eval $cmdline

	cd - >/dev/null 2>&1
	rm $src_path_abs/reveal.js $src_path_abs/css
}


# main()

arg_path_mgmt "$@"
cd $exec_root_dir

for path in $paths_to_process
do 
	echo "INFO: Building $path"
	build_slides $path
done
