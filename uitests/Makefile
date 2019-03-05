# https://codeburst.io/building-beautiful-command-line-interfaces-with-python-26c7e1bb54df
.SILENT: #don't echo commands as we run them.

args := `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

UITESTS_EXEC := docker-compose exec uitests

.PHONY: dev
dev :
	docker-compose run uitests codeceptjs run --steps



# https://stackoverflow.com/questions/6273608/
%:      # thanks to chakrit
    @:    # thanks to William Pursell
