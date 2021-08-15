
import subprocess
import click

programs = {
    "icofx": 'C:/images/icofx3/icofx3.exe',
    "chrome": 'C:/interbot/Google/Chrome/Application/chrome.exe'
}

@click.command()
@click.argument('name')
def main(name):
    if name not in programs: print('program unknown')
    ok = subprocess.call([programs[name]])
    print(f"Program {name} was launched. {ok}")

if __name__ == "__main__":
    main()