#!/bin/bash

# default global_opts
exec_root_dir=$(dirname $0)/..
docker_image="jagregory/pandoc"
script_to_run="bin/build.sh"

# helpers

source $(dirname "$0")/arg_path_mgmt.sh

# main()

arg_path_mgmt "$@"
cd $exec_root_dir


docker_opts="run -v `pwd`:/source --entrypoint \"\" --rm"
if [ -t 1 ] 
then 
	docker_opts="$docker_opts -ti"
fi

if $(test "$http_proxy" != "")
then
	docker_opts="$docker_opts -e http_proxy=$http_proxy"
fi

cmdline="docker $docker_opts $docker_image $script_to_run $paths_to_process"
echo "INFO: Running \"$cmdline\" under \"$(pwd)\""
eval $cmdline
