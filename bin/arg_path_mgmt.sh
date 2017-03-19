#!/bin/bash

function arg_path_mgmt {
	if $(test $# -eq 0) 
	then
		return 0
	fi
	echo "DEBUG: pwd=$(pwd) \$1=$1"
	if $(test -d "$1") && $(test "$(ls $1/*.md | wc -l)" -ne 0)
	then
		paths_to_process=$(realpath --relative-to=$exec_root_dir "$1")
	else
		echo "ERROR: Non-dir argument passed, or no markdown files found"
		exit 1
	fi
}
