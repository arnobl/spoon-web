package spoon.resource;

import java.util.Optional;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import spoon.ast.api.SpoonAST;
import spoon.ast.api.TreeLevel;
import spoon.ast.builder.SpoonTreeCmdBase;

@Singleton
@Path("spoon")
public class SpoonResource {
	public SpoonResource() {
		super();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("ast")
	public SpoonAST createAST(final CodeDTO code) {
		final var okLevel = TreeLevel.from(code.level);

		if(okLevel.isEmpty()) {
			throw new WebApplicationException("Incorect level");
		}

		final var cmd = new SpoonTreeCmdBase(true, code.code, okLevel.get());
		final Optional<SpoonAST> execute = cmd.execute();
		return execute.orElseThrow(() -> new WebApplicationException("Fail to parse"));
	}
}
